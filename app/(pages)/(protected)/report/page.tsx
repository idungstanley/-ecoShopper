'use client'
import { useReport } from '@/app/features/map/mapService';
import {
  Box,
  Button,
  Flex,
  Select,
  Spinner,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import React, { useState } from 'react'
import { VscReport } from 'react-icons/vsc'

const page = () => {
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")
  const [report, setReport] = useState("")
  const {mutateAsync} = useReport()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleSubmit = () => {
    mutateAsync({
      desiscription: report,
      location: [longitude, latitude],
      type: ''
    })
  }

  return (
    <div className="my-4 flex flex-col gap-4">
      <Select.Root>
        <Select.Trigger placeholder="Select Report Type" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Type</Select.Label>
            <Select.Separator />
            <Select.Item value="alien_sighting">Alien sighting</Select.Item>
            <Select.Item value="safe_zone">Safe zone</Select.Item>
            <Select.Item value="resource_status">Resource Status</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Flex direction="row" gap="3">
        <Box>
          <label className="text-white text-[12px]">Longitude</label>
          <TextField.Root value={longitude} onChange={handleChange} name='longitude' size="2" placeholder="Enter your longitude..." />
        </Box>
        <Box>
          <label className="text-white text-[12px]">Latitude</label>
          <TextField.Root name="latitude" value={latitude} size="2" placeholder="Enter your latitude..." />
        </Box>
      </Flex>
      <TextArea
        size="3"
        value={report}
        name="report"
        placeholder="Describe to us what you saw in details. . ."
      />
      <Button variant="solid" className="cursor-pointer" onClick={handleSubmit}>
        <Spinner loading={false}>
          <VscReport />
        </Spinner>
        Submit Report
      </Button>
    </div>
  )
}

export default page
