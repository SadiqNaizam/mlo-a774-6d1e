import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Sample contact data structure
interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
}

const contacts: Contact[] = [
  { id: '1', name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alice', initials: 'AJ' },
  { id: '2', name: 'Bob Williams', avatarUrl: 'https://i.pravatar.cc/150?u=bob', initials: 'BW' },
  { id: '3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=charlie', initials: 'CB' },
  { id: '4', name: 'Diana Miller', avatarUrl: 'https://i.pravatar.cc/150?u=diana', initials: 'DM' },
  { id: '5', name: 'Ethan Davis', avatarUrl: 'https://i.pravatar.cc/150?u=ethan', initials: 'ED' },
  { id: '6', name: 'Fiona Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=fiona', initials: 'FG' },
];

const ContactsPage = () => {
  console.log('ContactsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex justify-center items-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Start a New Chat</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-4">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                          <AvatarFallback>{contact.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                      <Button asChild variant="secondary">
                        <Link to="/conversation"> {/* Path from App.tsx */}
                          Chat
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No contacts found.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <AppFooter />
    </div>
  );
};

export default ContactsPage;