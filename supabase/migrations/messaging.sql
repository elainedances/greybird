-- Messaging feature tables

-- Conversations
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Conversation participants
CREATE TABLE conversation_participants (
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

-- Messages
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);

-- Indexes
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_conversation_participants_user_id ON conversation_participants(user_id);

-- RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Conversations: authenticated users can create conversations
CREATE POLICY "Authenticated users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Conversation participants: users can add themselves to conversations
CREATE POLICY "Users can add participants to new conversations"
  ON conversation_participants FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Conversations: users can see conversations they participate in
CREATE POLICY "Users can view their conversations"
  ON conversations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM conversation_participants
    WHERE conversation_id = conversations.id AND user_id = auth.uid()
  ));

-- Conversation participants: users can see participants of their conversations
CREATE POLICY "Users can view participants of their conversations"
  ON conversation_participants FOR SELECT
  USING (
    user_id = auth.uid() OR
    conversation_id IN (
      SELECT cp.conversation_id FROM conversation_participants cp WHERE cp.user_id = auth.uid()
    )
  );

-- Messages: users can view messages in their conversations
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM conversation_participants
    WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
  ));

-- Messages: users can insert messages in their conversations
CREATE POLICY "Users can send messages to their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

-- Messages: users can update read_at on messages sent to them
CREATE POLICY "Users can mark messages as read"
  ON messages FOR UPDATE
  USING (
    sender_id != auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    sender_id != auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

-- Function to get or create a 1-on-1 conversation
CREATE OR REPLACE FUNCTION get_or_create_conversation(other_user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  conv_id uuid;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Find existing 1-on-1 conversation between these two users
  SELECT cp1.conversation_id INTO conv_id
  FROM conversation_participants cp1
  JOIN conversation_participants cp2 ON cp1.conversation_id = cp2.conversation_id
  WHERE cp1.user_id = current_user_id
    AND cp2.user_id = other_user_id
    AND (SELECT count(*) FROM conversation_participants cp3 WHERE cp3.conversation_id = cp1.conversation_id) = 2
  LIMIT 1;

  IF conv_id IS NOT NULL THEN
    RETURN conv_id;
  END IF;

  -- Create new conversation
  INSERT INTO conversations DEFAULT VALUES RETURNING id INTO conv_id;
  INSERT INTO conversation_participants (conversation_id, user_id) VALUES (conv_id, current_user_id);
  INSERT INTO conversation_participants (conversation_id, user_id) VALUES (conv_id, other_user_id);

  RETURN conv_id;
END;
$$;

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
