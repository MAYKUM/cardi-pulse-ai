import { useState } from "react";
import { Wifi, WifiOff, Activity, Stethoscope, Smartphone, RefreshCw, Settings, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const connectedDevices = [
  {
    id: "ECG001",
    name: "Phillips PageWriter TC70",
    type: "ECG Machine",
    status: "connected",
    location: "Room 101",
    lastSync: "2 mins ago",
    dataCount: 1247,
    batteryLevel: 85
  },
  {
    id: "ECHO001", 
    name: "GE Vivid E95",
    type: "Echo Machine",
    status: "connected",
    location: "Echo Lab",
    lastSync: "5 mins ago",
    dataCount: 89,
    batteryLevel: null
  },
  {
    id: "MON001",
    name: "Holter Monitor #23",
    type: "Holter Monitor",
    status: "syncing",
    location: "Patient Room",
    lastSync: "30 mins ago",
    dataCount: 48,
    batteryLevel: 42
  },
  {
    id: "WATCH001",
    name: "Apple Watch Series 9",
    type: "Wearable",
    status: "disconnected",
    location: "Patient: John Doe",
    lastSync: "2 hours ago",
    dataCount: 324,
    batteryLevel: 68
  }
];

const dataStreamMetrics = [
  { name: "ECG Readings", current: 847, daily: 2500, unit: "readings/hour" },
  { name: "Echo Studies", current: 12, daily: 45, unit: "studies/day" },
  { name: "Holter Data", current: 156, daily: 400, unit: "MB/hour" },
  { name: "Wearable Sync", current: 892, daily: 2000, unit: "syncs/hour" }
];

export function DeviceIntegration() {
  const [autoSync, setAutoSync] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Wifi className="h-4 w-4 text-success" />;
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-warning animate-spin" />;
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-critical" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Connected</Badge>;
      case "syncing":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Syncing</Badge>;
      case "disconnected":
        return <Badge variant="secondary" className="bg-critical/10 text-critical border-critical/20">Disconnected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "ECG Machine":
        return <Activity className="h-5 w-5 text-primary" />;
      case "Echo Machine":
        return <Stethoscope className="h-5 w-5 text-primary" />;
      case "Holter Monitor":
        return <Activity className="h-5 w-5 text-primary" />;
      case "Wearable":
        return <Smartphone className="h-5 w-5 text-primary" />;
      default:
        return <Settings className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Device Integration</h1>
          <p className="text-muted-foreground">Connected medical devices and data streaming</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Add Device
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">3</p>
                <p className="text-sm text-muted-foreground">Connected Devices</p>
              </div>
              <Wifi className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">1</p>
                <p className="text-sm text-muted-foreground">Syncing</p>
              </div>
              <RefreshCw className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-critical">1</p>
                <p className="text-sm text-muted-foreground">Disconnected</p>
              </div>
              <WifiOff className="h-8 w-8 text-critical" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-muted-foreground">Today's Data Points</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Connected Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Data Count</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connectedDevices.map((device) => (
                <TableRow key={device.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">{device.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      {getStatusBadge(device.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{device.lastSync}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {device.dataCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {device.batteryLevel ? (
                      <div className="flex items-center gap-2">
                        <Progress value={device.batteryLevel} className="w-16 h-2" />
                        <span className="text-sm">{device.batteryLevel}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Flow Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Data Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dataStreamMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{metric.name}</span>
                  <span className="text-muted-foreground">{metric.unit}</span>
                </div>
                <div className="space-y-1">
                  <Progress value={(metric.current / metric.daily) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{metric.current} current</span>
                    <span>{metric.daily} daily target</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Auto Sync</label>
                <p className="text-xs text-muted-foreground">
                  Automatically sync data from connected devices
                </p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Real-time Monitoring</label>
                <p className="text-xs text-muted-foreground">
                  Enable live data streaming and alerts
                </p>
              </div>
              <Switch checked={realTimeMonitoring} onCheckedChange={setRealTimeMonitoring} />
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="text-sm font-medium">Sync Intervals</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">ECG Machines</span>
                  <Badge variant="outline" className="text-xs">Every 30s</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Echo Machines</span>
                  <Badge variant="outline" className="text-xs">Every 2min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wearables</span>
                  <Badge variant="outline" className="text-xs">Every 5min</Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Configure Device Protocols
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}