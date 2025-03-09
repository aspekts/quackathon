'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';

export default function ProfileCompletion() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [courses] = useState(['Computer Science', 'Medicine', 'Law', 'Mechanical Engineering']);
  const [formData, setFormData] = useState({
    username: '',
    course: '',
    interests: []
  });

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username, course')
          .eq('id', user.id)
          .single();

        if (!data?.username || !data?.course) {
          setOpen(true);
        }
      }
    };

    checkProfile();
  }, [user]);

  const handleSubmit = async () => {
    await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id);
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
        {/* Form fields for profile completion */}
        <Button onClick={handleSubmit}>Save Profile</Button>
      </DialogContent>
    </Dialog>
  );
}