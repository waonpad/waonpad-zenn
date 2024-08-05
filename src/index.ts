import { depend } from 'velona'

export const myFunc = depend({
  logger: (() => {
    console.log('funcを使用するかに関わらず、このログは出力される')

    return console.log
  })()
}, ({ logger }, name: string) => {
  logger(name)
})

export const myFunc2 = (
  { name }: { name: string },
  { __deps: { logger = console.log } = {} } = {}
) => {
  logger(name)
}

const main = () => {
  myFunc("ユーザー")

  myFunc2({ name: "ユーザー" })
}

main()
