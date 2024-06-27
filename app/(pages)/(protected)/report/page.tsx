import {
  Box,
  Button,
  Flex,
  Select,
  Spinner,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import React from 'react'
import { VscReport } from 'react-icons/vsc'

const page = () => {
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
          <TextField.Root size="2" placeholder="Enter your longitude..." />
        </Box>
        <Box>
          <label className="text-white text-[12px]">Latitude</label>
          <TextField.Root size="2" placeholder="Enter your latitude..." />
        </Box>
      </Flex>
      <TextArea
        size="3"
        placeholder="Describe to us what you saw in details. . ."
      />
      <Button variant="solid" className="cursor-pointer">
        <Spinner loading={false}>
          <VscReport />
        </Spinner>
        Submit Report
      </Button>
    </div>
  )
}

export default page
