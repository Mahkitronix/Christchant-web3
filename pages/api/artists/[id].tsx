import { NextApiRequest, NextApiResponse } from 'next'
import { validateRequest } from '@/utils/api/validation'
import { artistSchema } from '@/validations/center/artist'
import ServiceRepo from '@/https/repository/Service'
import { ARTIST_STATUS } from '@/utils/constants/Artist'
import withCors from '@/middleware/server/withCors'
import { slugify } from 'camote-utils'

const updateArtist = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceRepo = new ServiceRepo()

  const { id } = req.query as any

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

    const validStatuses = ['draft', 'pending', 'published', 'rejected']

    const validatedData = validation.data as any

    if (!validStatuses.includes(validatedData.status)) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: 'status',
            message: 'Invalid status',
          },
        ],
      })
    }

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
      ...validatedData,
      nameSlug: slugify(validatedData.name),
      image: validatedData.image ?? null,
      website: validatedData.website ?? null,
      youtube: validatedData.youtube ?? null,
      youtubeMusic: validatedData.youtubeMusic ?? null,
      spotify: validatedData.spotify ?? null,
      appleMusic: validatedData.appleMusic ?? null,
      status: validatedData.status ?? null,
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

const deleteArtist = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceRepo = new ServiceRepo()

  const { id } = req.query as any

  try {
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

    if (
      artist?.status !== ARTIST_STATUS.DRAFT &&
      artist.status !== ARTIST_STATUS.REJECTED
    ) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: 'status',
            message: 'Artist is not draft or rejected',
          },
        ],
      })
    }

    if (artist?.status === ARTIST_STATUS.PUBLISHED) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: 'status',
            message: 'Artist is published. You need to delete the songs first',
          },
        ],
      })
    }

    await serviceRepo.artistRepo.deleteArtist(id)

    res.status(200).json({
      data: null,
      success: true,
      message: 'Artist delete successful',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [
        {
          field: 'general',
          message:
            error instanceof Error ? error.message : 'Artist delete failed',
        },
      ],
    })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      return updateArtist(req, res)
    case 'DELETE':
      return deleteArtist(req, res)
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
