import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Phone, Mail, Smartphone } from 'lucide-react';

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'authentication' | 'access' | 'monitoring' | 'encryption';
}

export const SecuritySettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [auditLogging, setAuditLogging] = useState(true);

  const securitySettings: SecuritySetting[] = [
    {
      id: 'mfa',
      name: 'Multi-Factor Authentication',
      description: 'Require additional verification beyond password',
      enabled: twoFactorEnabled,
      category: 'authentication'
    },
    {
      id: 'session_timeout',
      name: 'Automatic Session Timeout',
      description: 'Log out inactive users after specified time',
      enabled: true,
      category: 'access'
    },
    {
      id: 'audit_log',
      name: 'Audit Logging',
      description: 'Log all user actions for security monitoring',
      enabled: auditLogging,
      category: 'monitoring'
    },
    {
      id: 'encryption',
      name: 'Data Encryption at Rest',
      description: 'Encrypt sensitive patient data in database',
      enabled: true,
      category: 'encryption'
    }
  ];

  const recentSecurityEvents = [
    {
      id: '1',
      type: 'login',
      description: 'Successful login from new device',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'info'
    },
    {
      id: '2',
      type: 'failed_login',
      description: 'Failed login attempt detected',
      timestamp: '2024-01-15T09:45:00Z',
      severity: 'warning'
    },
    {
      id: '3',
      type: 'password_change',
      description: 'Password changed successfully',
      timestamp: '2024-01-14T16:20:00Z',
      severity: 'info'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return Lock;
      case 'access': return Key;
      case 'monitoring': return Eye;
      case 'encryption': return Shield;
      default: return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Settings</h1>
          <p className="text-muted-foreground">Manage account security and access controls</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Secure
        </Badge>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="mfa">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4">
            {securitySettings.map((setting) => {
              const Icon = getCategoryIcon(setting.category);
              
              return (
                <Card key={setting.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{setting.name}</CardTitle>
                          <CardDescription>{setting.description}</CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => {
                          if (setting.id === 'mfa') {
                            setTwoFactorEnabled(!twoFactorEnabled);
                          } else if (setting.id === 'audit_log') {
                            setAuditLogging(!auditLogging);
                          }
                        }}
                      />
                    </div>
                  </CardHeader>
                  {setting.id === 'session_timeout' && (
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Label htmlFor="timeout">Session timeout (minutes):</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={sessionTimeout}
                          onChange={(e) => setSessionTimeout(e.target.value)}
                          className="w-24"
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="mfa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!twoFactorEnabled ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Two-factor authentication is currently disabled. Enable it to secure your account.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4">
                      <div className="text-center space-y-2">
                        <Smartphone className="h-8 w-8 mx-auto text-primary" />
                        <h3 className="font-medium">Authenticator App</h3>
                        <p className="text-sm text-muted-foreground">Use Google Authenticator or similar apps</p>
                        <Button size="sm" className="w-full">Setup</Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="text-center space-y-2">
                        <Phone className="h-8 w-8 mx-auto text-primary" />
                        <h3 className="font-medium">SMS</h3>
                        <p className="text-sm text-muted-foreground">Receive codes via text message</p>
                        <Button size="sm" variant="outline" className="w-full">Setup</Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="text-center space-y-2">
                        <Mail className="h-8 w-8 mx-auto text-primary" />
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">Receive codes via email</p>
                        <Button size="sm" variant="outline" className="w-full">Setup</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Two-factor authentication is enabled and protecting your account.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">View Recovery Codes</Button>
                    <Button variant="outline" onClick={() => setTwoFactorEnabled(false)}>
                      Disable 2FA
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>Monitor access and security-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSecurityEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Security Logs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Healthcare security and privacy compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">HIPAA Compliance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All patient data is encrypted and access is logged according to HIPAA requirements.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">GDPR Compliance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Data processing follows GDPR guidelines with user consent and right to deletion.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">SOC 2 Type II</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Security controls and processes are audited and certified annually.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Data Encryption</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                    </p>
                  </div>
                </div>
                
                <Button className="w-full">Download Compliance Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};