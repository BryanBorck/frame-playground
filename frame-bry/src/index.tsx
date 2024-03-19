import { serveStatic } from '@hono/node-server/serve-static'
import { handle } from 'frog/vercel'
import { Button, Frog } from 'frog'
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// app.use('/*', serveStatic({ root: './public' }))

// Frame to capture user's favorite fruit.
app.frame('/', (c) => {
  return c.res({
    action: '/submit',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Select your favorite fruit:
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>
    ]
  })
})
 
// Frame to display user's response.
app.frame('/submit', (c) => { 
  const { buttonValue } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Selected: {buttonValue}
      </div>
    ),
    intents: [
      <Button.Reset>Reset</Button.Reset>,
    ]
  })
})

export const GET = handle(app)
export const POST = handle(app)