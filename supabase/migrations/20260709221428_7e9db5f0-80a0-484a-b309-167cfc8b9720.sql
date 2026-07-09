
-- Revoke public/anon/authenticated EXECUTE on SECURITY DEFINER functions.
-- Trigger + admin-only helpers: revoke from all app roles (triggers run via system; admin funcs unused by client).
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.guard_receipt_jobs_owner_update() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.guard_report_status_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.guard_expense_status_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.record_audit(text, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.apply_policy_violations(uuid, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_app_setting(text, text) FROM PUBLIC, anon, authenticated;

-- RLS helpers: revoke from PUBLIC/anon; keep authenticated (required for RLS policy evaluation).
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_any_role(uuid, app_role[]) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.manages(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_app_setting(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.manages(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_app_setting(text) TO authenticated;
