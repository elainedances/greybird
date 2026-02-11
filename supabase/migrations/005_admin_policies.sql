-- Admin RLS policies: allow admin emails full access

-- Profiles: admin can SELECT all
CREATE POLICY "admin_select_all_profiles" ON profiles
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );

-- Profiles: admin can UPDATE all
CREATE POLICY "admin_update_all_profiles" ON profiles
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );

-- Posts: admin can SELECT all
CREATE POLICY "admin_select_all_posts" ON posts
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );

-- Posts: admin can UPDATE all
CREATE POLICY "admin_update_all_posts" ON posts
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );

-- Posts: admin can DELETE all
CREATE POLICY "admin_delete_all_posts" ON posts
  FOR DELETE USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );

-- Waitlist: admin can SELECT all
CREATE POLICY "admin_select_all_waitlist" ON waitlist
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('elainemyass@gmail.com')
  );
