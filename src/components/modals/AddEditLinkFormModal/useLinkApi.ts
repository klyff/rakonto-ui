import { api } from '@root/api'
import { LinkFormType, LinkType } from '@root/types'

interface iUsePeopleApi {
  createLink: (data: LinkFormType) => Promise<LinkType>
}

export const useLinkApi = (): iUsePeopleApi => {
  const createLink = async (data: LinkFormType) => {
    const link = await api.createLink(data)
    return link
  }

  return {
    createLink
  }
}
