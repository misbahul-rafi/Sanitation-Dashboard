export type ResmonProps = {
  cpu: {
    percent: number | null
  },
  memory: {
    percent: number | null,
    used: number | null,
    total: number | null
  },
  disk: {
    percent: number | null,
    used: number | null,
    total: number | null
  },
  temperature: {
    temperature: number | null
  },
  timestamp: number | null,
}

export type TableProps = {
  id: number,
  area: number[],
  status: string,
  status_buffer: string[],
  start_time: number | null,
  last_alert: number | null,
  items: string[]
}

export type CameraProps = {
  name: string,
  status: boolean,
  is_update: boolean,
  tables: TableProps[]
}

export type StreamPayload = {
  system: ResmonProps,
  cameras: CameraProps[]
}

export type StatusProps = {
  clean: number,
  dirty: number,
  used: number
}