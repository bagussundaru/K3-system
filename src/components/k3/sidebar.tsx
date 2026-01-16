'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Activity, 
  Wind, 
  ShieldCheck, 
  AlertTriangle,
  FileCheck,
  Users,
  Settings,
  BarChart3,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'SafeGuard', href: '/safeguard', icon: Activity },
  { name: 'EnviroSense', href: '/envirosense', icon: Wind },
  { name: 'SiteSecure', href: '/sitesecure', icon: ShieldCheck },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Compliance', href: '/compliance', icon: FileCheck },
  { name: 'Workers', href: '/workers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-700">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-emerald-500" />
          <div>
            <h1 className="text-lg font-bold text-white">K3 System</h1>
            <p className="text-xs text-slate-400">Enterprise Class</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-slate-700 p-4">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-emerald-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
