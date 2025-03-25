'use client'
import React, { useEffect, useState } from 'react'
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
import { formSchema } from '@/schema/profileSchema'
import { getCities, getStates } from '@/services/locationService'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface State {
  id: string
  name: string
  iso2: string
}

interface City {
  id: string
  name: string
}

type FormValues = z.infer<typeof formSchema> & {
  addressType: string
}

const ProfilePage = () => {
  const { data: session } = useSession()
  const name = session?.user?.name
  const email = session?.user?.email
  const image = session?.user?.image

  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [stateOpen, setStateOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [selectedState, setSelectedState] = useState<State | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data)
  }

  // Fetch states on page load
  useEffect(() => {
    getStates().then((fetchedStates) => {
      setStates(fetchedStates)
      console.log('States:', fetchedStates)
    })
  }, [])

  useEffect(() => {
    if (selectedState && selectedState.iso2) {
      // ✅ Use iso2, not id
      console.log(
        'Fetching cities for state:',
        selectedState.iso2,
        selectedState.name
      )
      getCities('IN', selectedState.iso2)
        .then((fetchedCities) => {
          console.log('Raw cities response:', fetchedCities)
          setCities(Array.isArray(fetchedCities) ? fetchedCities : [])
          console.log('Cities after setting:', fetchedCities)
        })
        .catch((error) => {
          console.error('Error fetching cities:', error)
        })
    }
  }, [selectedState])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                defaultValue={name ?? ''}
                {...register('name')}
                readOnly
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                defaultValue={email ?? 'example@gmail.com'}
                {...register('email')}
                readOnly
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
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
                <p className="text-red-500">{errors.number.message}</p>
              )}
            </div>

            <div>
              {/* State Selection with Popover */}
              <div>
                <h1 className="mt-4 font-semibold">Confirm Your Location</h1>

                {/* State & City Selection with Popover */}
                <div className="flex gap-1 mt-1 w-full">
                  {/* State Selection */}
                  <Popover open={stateOpen} onOpenChange={setStateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full max-w-[240px] flex-shrink-0"
                      >
                        <Controller
                          control={control}
                          name="state"
                          render={({ field }) => (
                            <span>
                              {field.value
                                ? field.value.name
                                : 'Select a State'}
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
                            {states.length > 0 ? (
                              states.map((state) => (
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
                              ))
                            ) : (
                              <p className="text-center py-2 text-gray-500">
                                No states found
                              </p>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* City Selection */}
                  {selectedState && (
                    <Popover open={cityOpen} onOpenChange={setCityOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full max-w-[240px] flex-shrink-0"
                        >
                          <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (
                              <span>
                                {field.value
                                  ? field.value.name
                                  : 'Select a City'}
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
                              {cities.length > 0 ? (
                                cities.map((city) => (
                                  <CommandItem
                                    key={city.id}
                                    onSelect={() => {
                                      setValue('city', city)
                                      setCityOpen(false)
                                    }}
                                  >
                                    {city.name}
                                  </CommandItem>
                                ))
                              ) : (
                                <p className="text-center py-2 text-gray-500">
                                  No cities found
                                </p>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Input
                type="text"
                {...register('address')}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <Label>Pincode</Label>
              <Input
                type="text"
                {...register('pincode')}
                placeholder="Enter your pincode"
              />
            </div>

            <div className="mt-4">
              <h2 className="font-semibold">Select Address Type</h2>
              <RadioGroup
                onValueChange={(value) => setValue('addressType', value)}
                defaultValue="home"
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="office" id="office" />
                  <Label htmlFor="office">Office</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="mt-4 w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
