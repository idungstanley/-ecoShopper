'use client'
import { SelectDropdown } from '@/app/components/inputs/SelectInput'
import { useReport } from '@/app/features/map/mapService'
import { ReportValidationProps } from '@/app/types'
import { reportSchema } from '@/app/validationSchema'
import {
  Box,
  Button,
  Flex,
  Select,
  Spinner,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { VscReport } from 'react-icons/vsc'

const roles = [
  { name: 'Alien sighting', value: 'alien_sighting' },
  { name: 'Safe zone', value: 'safe_zone' },
  { name: 'Resource Status', value: 'resource_status' },
]

const page = () => {
  const [type, setType] = useState<{ name: string; value: string }>()
  const { mutateAsync } = useReport()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setType(roles.find((item) => item.name === value))
  }

  const formik = useFormik({
    initialValues: {
      longitude: '',
      latitude: '',
      description: '',
    },
    validationSchema: reportSchema,
    validateOnBlur: true,
    onSubmit: async (values: ReportValidationProps) => {
      try {
        await mutateAsync({
          location: [values.longitude, values.latitude],
          description: values.description,
          type: type?.value as string,
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <form className="my-4 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <SelectDropdown
        placeholder="Select Report Type"
        showPlaceholder={true}
        value="name"
        data={roles}
        handleSelect={handleSelect}
        customClasses="h-10 w-full"
      />
      <Flex direction="row" gap="3">
        <Box>
          <label className="text-white text-[12px]">Longitude</label>
          <TextField.Root
            value={formik.values.longitude}
            onChange={formik.handleChange}
            name="longitude"
            size="2"
            placeholder="Enter your longitude..."
          />
        </Box>
        <Box>
          <label className="text-white text-[12px]">Latitude</label>
          <TextField.Root
            onChange={formik.handleChange}
            name="latitude"
            value={formik.values.latitude}
            size="2"
            placeholder="Enter your latitude..."
          />
        </Box>
      </Flex>
      <TextArea
        size="3"
        onChange={formik.handleChange}
        value={formik.values.description}
        name="description"
        placeholder="Describe to us what you saw in details. . ."
      />
      <Button variant="solid" type="submit" className="cursor-pointer">
        <Spinner loading={false}>
          <VscReport />
        </Spinner>
        Submit Report
      </Button>
    </form>
  )
}

export default page
