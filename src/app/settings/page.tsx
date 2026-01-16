'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  Save, 
  Bell, 
  Shield, 
  Database,
  Users,
  Monitor,
  Wifi,
  HardDrive,
  Download,
  Upload
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Konfigurasi sistem, notifikasi, dan preferensi pengguna
        </p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-600" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-sm font-medium text-emerald-900">API Server</span>
              </div>
              <div className="text-lg font-bold text-emerald-700">Online</div>
              <div className="text-xs text-emerald-600">Uptime: 99.9%</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-sm font-medium text-emerald-900">Database</span>
              </div>
              <div className="text-lg font-bold text-emerald-700">Online</div>
              <div className="text-xs text-emerald-600">Last backup: 2h ago</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-sm font-medium text-emerald-900">WebSocket</span>
              </div>
              <div className="text-lg font-bold text-emerald-700">Connected</div>
              <div className="text-xs text-emerald-600">45 active devices</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Storage</span>
              </div>
              <div className="text-lg font-bold text-emerald-700">42% Used</div>
              <div className="text-xs text-emerald-600">4.2 GB / 10 GB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Alert & Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Email Notifications</h4>
              <p className="text-sm text-slate-600">Receive alerts via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">SMS Notifications</h4>
              <p className="text-sm text-slate-600">Receive critical alerts via SMS</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Push Notifications</h4>
              <p className="text-sm text-slate-600">Receive in-app push notifications</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Sound Alerts</h4>
              <p className="text-sm text-slate-600">Play sound for critical alerts</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-900 mb-4">Alert Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Fatigue Threshold (%)</label>
                <Input type="number" defaultValue="80" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Heart Rate High (bpm)</label>
                <Input type="number" defaultValue="100" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">CO Level (PPM)</label>
                <Input type="number" defaultValue="25" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Ammonia Level (PPM)</label>
                <Input type="number" defaultValue="25" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-blue-600" />
            Device Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Auto Device Discovery</h4>
              <p className="text-sm text-slate-600">Automatically detect new devices on network</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Low Battery Alert (%)</h4>
              <p className="text-sm text-slate-600">Alert when device battery falls below</p>
            </div>
            <Input type="number" defaultValue="20" className="w-20" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Offline Device Alert (minutes)</h4>
              <p className="text-sm text-slate-600">Alert when device is offline for</p>
            </div>
            <Input type="number" defaultValue="5" className="w-20" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">Data Sync Interval (seconds)</h4>
              <p className="text-sm text-slate-600">Frequency of data sync from devices</p>
            </div>
            <Input type="number" defaultValue="30" className="w-20" />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Compliance & Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Active Standards</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <span className="font-medium text-slate-900">Permenaker 5/2018</span>
                  <p className="text-xs text-slate-600">Kementerian Ketenagakerjaan Republik Indonesia</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <span className="font-medium text-slate-900">ISO 45001:2018</span>
                  <p className="text-xs text-slate-600">Occupational Health and Safety Management Systems</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <span className="font-medium text-slate-900">TKDN Compliance</span>
                  <p className="text-xs text-slate-600">Tingkat Komponen Dalam Negeri - 40%</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-600" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-slate-900 mb-1">Export Data</h4>
              <p className="text-sm text-slate-600 mb-3">Download all data as CSV/JSON</p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-slate-900 mb-1">Import Data</h4>
              <p className="text-sm text-slate-600 mb-3">Import data from CSV/JSON</p>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-slate-900 mb-1">Generate Reports</h4>
              <p className="text-sm text-slate-600 mb-3">Create compliance reports</p>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-900 mb-2">Data Retention</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700">Sensor Data (days)</label>
                <Input type="number" defaultValue="90" className="mt-1" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700">Alert History (days)</label>
                <Input type="number" defaultValue="365" className="mt-1" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700">Incident Records (days)</label>
                <Input type="number" defaultValue="1825" className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-slate-900 mb-2">Current User</h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Admin K3</div>
                <div className="text-sm text-slate-600">admin@company.com</div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-slate-900">3</div>
              <div className="text-sm text-slate-600">Admin Users</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-slate-900">8</div>
              <div className="text-sm text-slate-600">HSE Officers</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold text-slate-900">15</div>
              <div className="text-sm text-slate-600">Supervisors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
