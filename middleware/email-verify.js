export default function({ store, redirect, route }) {
  // 没有登录
  if (!store.state.auth.loggedIn) return;

  // 邮件已经验证了
  if (store.state.auth.user.email_verified_at) return;

  // 已经是验证电子邮件的页面了(避免死循环)
  if (route.name == 'email-resend') return;

  // 排除 email-verify 路由
  if (route.name == 'email-verify') return;

  // 重定向到重发邮箱验证连接的页面
  return redirect('/email/resend')
}
