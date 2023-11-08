export interface Asset {
  // file: File;
  title: string
  description: string
  videoTx: string
  trailerTx: string
  license: string
  payment: string
  renderer: string
  tags: Tag[]
  creatorName: string
  creatorId: string
}

interface Tag {
  name?: string
  value: string
}
