import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal, Phone } from 'lucide-react';

const AuthenticationPage = () => {
  console.log('AuthenticationPage loaded');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otp.length < 6) {
        setError("Please enter the 6-digit OTP.");
        return;
    }
    setIsLoading(true);
    // Simulate verifying OTP
    setTimeout(() => {
      if (otp === '123456') { // Mock OTP
        navigate('/chat-list');
      } else {
        setIsLoading(false);
        setError("Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ChatSphere</CardTitle>
          <CardDescription>
            {step === 'phone'
              ? 'Enter your phone number to get started.'
              : 'Enter the 6-digit code sent to your phone.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={step === 'phone' ? handlePhoneSubmit : handleOtpSubmit}>
            {step === 'phone' && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
                        required
                     />
                  </div>
                </div>
              </div>
            )}
            {step === 'otp' && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 items-center">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )}
            
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            <CardFooter className="flex justify-center p-0 pt-6">
                <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                    ) : (
                    step === 'phone' ? 'Send OTP' : 'Verify & Login'
                    )}
                </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticationPage;