import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const SettingsPage: React.FC = () => {
  console.log('SettingsPage loaded');

  // State for form fields with placeholder data
  const [displayName, setDisplayName] = useState('Jane Doe');
  const [status, setStatus] = useState('Online and ready to chat!');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveChanges = () => {
    // In a real app, this would submit the data to a backend API
    console.log("Saving changes:", { displayName, status, notificationsEnabled });
    // Here you could show a toast notification for success
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AppHeader />
      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your public profile and application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@janedoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <Button variant="outline">Change Picture</Button>
                    <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>
              
              <Separator />

              {/* Profile Details Form */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input 
                    id="display-name" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                  />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="status">Status / Bio</Label>
                   <Textarea 
                     id="status" 
                     value={status} 
                     onChange={(e) => setStatus(e.target.value)} 
                     placeholder="Tell everyone a little about yourself."
                   />
                </div>
              </div>

              <Separator />

              {/* Notifications Section */}
              <div className="space-y-4">
                 <h3 className="text-lg font-medium">Preferences</h3>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                       <p className="font-medium">Desktop Notifications</p>
                       <p className="text-sm text-muted-foreground">Receive new message notifications on your computer.</p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                      aria-label="Toggle desktop notifications"
                    />
                 </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default SettingsPage;