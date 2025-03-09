'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import supabase from '@/lib/supabase';

const presetInterests = [
  'Programming', 'Sports', 'Music', 'Gaming',
  'Hiking', 'Photography', 'Reading', 'Cooking',
  'Travel', 'Art', 'Volunteering', 'Entrepreneurship'
];

export default function SignupPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    course: '',
    interests: []
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const { data: { user }, error: authError } = 
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Create profile with selected interests
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        username: formData.username,
        course: formData.course,
        interests: selectedInterests // Ensure this is correctly set
      }]);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Campus Companion Signup</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          type="email"
          placeholder="University Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Course"
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <div className="space-y-4">
          <h3 className="font-medium">Select Your Interests (Choose 3-5)</h3>
          <div className="flex flex-wrap gap-2">
            {presetInterests.map((interest) => (
              <Button
                key={interest}
                variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                type="button"
                onClick={() => toggleInterest(interest)}
                className="rounded-full"
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Button variant="link" onClick={() => router.push('/login')}>
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
}