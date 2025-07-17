import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const schema = z.object({
  country: z.string().nonempty('Country is required'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  otp: z.string().optional(),
});

const Login = () => {
  const [countries, setCountries] = useState([]);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Unexpected response");

      const formatted = data
        .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
        .map((c) => ({
          name: c.name.common,
          code: `${c.idd.root}${c.idd.suffixes[0]}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(formatted);
    } catch (err) {
      console.error("Error fetching countries:", err);
      toast.error("Failed to load country data");
    }
  };

  const onSubmit = (data) => {
    if (!otpSent) {
      setOtpSent(true);
      toast.info("OTP sent to your number");

      setTimeout(() => {
        toast.success("OTP: 1234 (use this to continue)");
      }, 1000);
      return;
    }

    if (data.otp === '1234') {
      dispatch(login({ phone: data.phone }));
      navigate('/dashboard');
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('country')}>
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={`${c.code}-${c.name}`} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country.message}</p>}

        <input
          type="text"
          placeholder="Enter 10-digit phone"
          {...register('phone')}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}

        {otpSent && (
          <>
            <input type="text" placeholder="Enter OTP" {...register('otp')} />
            {errors.otp && <p className="error">{errors.otp.message}</p>}
          </>
        )}

        <button type="submit">{otpSent ? 'Verify OTP' : 'Send OTP'}</button>
      </form>
    </div>
  );
};

export default Login;
