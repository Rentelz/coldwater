'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { sendUpDatedProfileDetails } from '@/store/slices/profile/updateProfileDetails'

import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from '@/components/ui/command'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { getCities, getStates } from '@/services/locationService'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress' // Import Progress component

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  number: z.string().min(10, 'Phone number must be 10 digits'),
  state: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    iso2: z.string().optional(),
  }),
  city: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
  }),
  address: z.string().min(1, 'Address is required'),
  pincode: z.string().min(1, 'Pincode is required'),
  addressType: z.enum(['home', 'office', 'other']),
})

type FormValues = z.infer<typeof formSchema>

interface State {
  id: string
  name: string
  iso2: string
}

interface City {
  id: string
  name: string
}

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()
  const { loading, success, error, data } = useSelector(
    (state: RootState) => state.updateProfile
  )

  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [stateOpen, setStateOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const [formErrors, setFormErrors] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressType: 'home',
    },
  })

  // Set session data into the form after it loads
  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '')
      setValue('email', session.user.email || '')
    }
  }, [session, setValue])

  const onSubmit = (data: FormValues) => {
    try {
      if (!data.state || !data.city || !data.addressType) {
        setFormErrors('Please complete all required fields.')
        return
      }

      const formData = {
        number: data.number,
        city: {
          id: data.city.id,
          name: data.city.name,
        },
        state: {
          id: data.state.id,
          name: data.state.name,
        },
        address: data.address,
        pincode: data.pincode,
        addressType: data.addressType,
      }

      const token = session?.idToken || session?.accessToken || ''
      dispatch(sendUpDatedProfileDetails({ updateData: formData, token }))
    } catch (error) {
      console.error('Error in form submission:', error)
      setFormErrors('An unexpected error occurred. Check console for details.')
    }
  }

  useEffect(() => {
    getStates()
      .then((fetchedStates) => setStates(fetchedStates))
      .catch((error) => console.error('Error fetching states:', error))
  }, [])

  useEffect(() => {
    if (selectedState?.iso2) {
      getCities('IN', selectedState.iso2)
        .then((fetchedCities) => {
          setCities(Array.isArray(fetchedCities) ? fetchedCities : [])
        })
        .catch((error) => console.error('Error fetching cities:', error))
    }
  }, [selectedState])

  if (status === 'loading') {
    return <div className="text-center py-10">Loading session...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {loading && (
            <div className="mb-4">
              {/* Progress Bar to show loading */}
              <Progress value={50} />{' '}
              {/* Adjust value as per your loading stage */}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {formErrors && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
                {formErrors}
              </div>
            )}

            {/* Name */}
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" {...register('name')} readOnly />
            </div>

            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} readOnly />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                type="text"
                {...register('number')}
                maxLength={10}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ''
                  )
                }}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message}
                </p>
              )}
            </div>

            {/* State and City */}
            <div className="mb-4">
              <h1 className="mt-4 font-semibold">Confirm Your Location</h1>
              <div className="flex gap-1 mt-1 w-full">
                {/* State Select */}
                <Popover open={stateOpen} onOpenChange={setStateOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full max-w-[240px]">
                      <Controller
                        control={control}
                        name="state"
                        render={({ field }) => (
                          <span>
                            {field.value ? field.value.name : 'Select a State'}
                          </span>
                        )}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-0">
                    <Command>
                      <CommandInput placeholder="Search state..." />
                      <CommandList>
                        <CommandGroup>
                          {states.map((state) => (
                            <CommandItem
                              key={state.id}
                              onSelect={() => {
                                setValue('state', state)
                                setSelectedState(state)
                                setStateOpen(false)
                              }}
                            >
                              {state.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* City Select */}
                {selectedState && (
                  <Popover open={cityOpen} onOpenChange={setCityOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full max-w-[240px]"
                      >
                        <Controller
                          control={control}
                          name="city"
                          render={({ field }) => (
                            <span>
                              {field.value ? field.value.name : 'Select a City'}
                            </span>
                          )}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-0">
                      <Command>
                        <CommandInput placeholder="Search city..." />
                        <CommandList>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city.id}
                                onSelect={() => {
                                  setValue('city', city)
                                  setCityOpen(false)
                                }}
                              >
                                {city.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" {...register('address')} />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" type="text" {...register('pincode')} />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            {/* Address Type */}
            <div className="mb-4">
              <Label>Address Type</Label>
              <Controller
                control={control}
                name="addressType"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <div className="flex gap-2">
                      <RadioGroupItem value="home" id="home" label="Home" />
                      <RadioGroupItem
                        value="office"
                        id="office"
                        label="Office"
                      />
                      <RadioGroupItem value="other" id="other" label="Other" />
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
