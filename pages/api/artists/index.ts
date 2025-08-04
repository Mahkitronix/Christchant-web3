import { NextApiRequest, NextApiResponse } from 'next'
import { validateRequest } from '@/utils/api/validation'
import { artistSchema } from '@/validations/center/artist'
import ServiceRepo from '@/https/repository/Service'
import withCors from '@/middleware/server/withCors'
import { slugify } from 'camote-utils'

async function createArtist(req: NextApiRequest, res: NextApiResponse) {
  const serviceRepo = new ServiceRepo()

  try {
    const validation = validateRequest(artistSchema, req.body)
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.errors.map((error) => ({
          field: error.field,
          message: error.message[0],
        })),
      })
    }

    const { name } = validation.data

    const artist = await serviceRepo.artistRepo.findArtistByName(name)

    if (artist) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: 'name',
            message: 'Artist name already exists',
          },
        ],
      })
    }

    await serviceRepo.artistRepo.createArtist({
      name: validation.data.name,
      nameSlug: slugify(validation.data.name),
      image: validation.data.image ?? null,
      website: validation.data.website ?? null,
      youtube: validation.data.youtube ?? null,
      youtubeMusic: validation.data.youtubeMusic ?? null,
      spotify: validation.data.spotify ?? null,
      appleMusic: validation.data.appleMusic ?? null,
    })

    res.status(200).json({
      data: null,
      success: true,
      message: 'Artist creation successful',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [
        {
          field: 'general',
          message:
            error instanceof Error ? error.message : 'Artist creation failed',
        },
      ],
    })
  }
}

const updateArtist = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceRepo = new ServiceRepo()

  try {
    const validation = validateRequest(artistSchema, req.body)
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.errors.map((error) => ({
          field: error.field,
          message: error.message[0],
        })),
      })
    }

    const { id, ...rest } = validation.data as any

    const artist = await serviceRepo.artistRepo.findArtistById(id)

    if (!artist) {
      return res.status(404).json({
        success: false,
        errors: [
          {
            field: 'id',
            message: 'Artist not found',
          },
        ],
      })
    }

    await serviceRepo.artistRepo.updateArtist(id, {
      ...rest,
      nameSlug: slugify(rest.name),
      image: rest.image ?? null,
      website: rest.website ?? null,
      youtube: rest.youtube ?? null,
      youtubeMusic: rest.youtubeMusic ?? null,
      spotify: rest.spotify ?? null,
      appleMusic: rest.appleMusic ?? null,
    })

    res.status(200).json({
      data: null,
      success: true,
      message: 'Artist update successful',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [
        {
          field: 'general',
          message:
            error instanceof Error ? error.message : 'Artist update failed',
        },
      ],
    })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return createArtist(req, res)
    case 'PUT':
      return updateArtist(req, res)
  }

  return res.status(405).json({
    success: false,
    errors: [
      {
        field: 'general',
        message: 'Method not allowed',
      },
    ],
  })
}

export default withCors(handler)
