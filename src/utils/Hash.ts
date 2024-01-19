import bcryptjs from 'bcryptjs'

export const hash = async (str: string ): Promise<string> => {
  const salt = bcryptjs.genSaltSync()
  return bcryptjs.hashSync( str, salt )
}

