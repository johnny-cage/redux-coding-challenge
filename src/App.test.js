import { render, fireEvent, cleanup, rerender, screen } from '@testing-library/react'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import users from './users.api.json'

let store
const {
  users: [
    { name: philip, id: philipId },
    { name: turanga, id: turangaId },
    { name: bender },
    { name: planet },
    { name: john },
    { name: zapp },
    { name: kif }
  ]
} = users

const regex = text => new RegExp(text, 'i')

beforeEach(() => {
  store = configureStore()
})

describe('200 OK', () => {
  const server = setupServer(
    rest.get('https://immense-bastion-95145.herokuapp.com/api/users', (req, res, ctx) => {
      return res(ctx.json(users))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('renders users select list', async () => {
    render(<Root store={store}/>)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    const [
      philipOption,
      turangaOption,
      benderOption,
      planetOption,
      johnOption,
      zappOption,
      kifOption
    ] = await Promise.all([
      screen.findByText(regex(philip)),
      screen.findByText(regex(turanga)),
      screen.findByText(regex(bender)),
      screen.findByText(regex(planet)),
      screen.findByText(regex(john)),
      screen.findByText(regex(zapp)),
      screen.findByText(regex(kif))
    ])

    expect(philipOption).toBeInTheDocument()
    expect(turangaOption).toBeInTheDocument()
    expect(benderOption).toBeInTheDocument()
    expect(planetOption).toBeInTheDocument()
    expect(johnOption).toBeInTheDocument()
    expect(zappOption).toBeInTheDocument()
    expect(kifOption).toBeInTheDocument()
  })

  test('renders selected users', async () => {
    render(<Root store={store}/>)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    await screen.findByText(regex(philip))
    const usersSelect = document.querySelector('.select select')

    fireEvent.change(usersSelect, { target: { value: philipId } })

    const selectedUsersHeading = screen.getByText(/selected users/i)
    const userInfo = screen.getByText(regex(`ID #${philipId}`))

    expect(selectedUsersHeading).toBeInTheDocument()
  })
})

describe('API error', () => {
  const server = setupServer(
    rest.get('https://immense-bastion-95145.herokuapp.com/api/users', (req, res, ctx) => {
      return res(ctx.status(404), ctx.json())
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('handles API errors', async () => {
    render(<Root store={store}/>)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    const error = await screen.findByText(/error/)
    expect(error).toBeInTheDocument()
  })
})

describe('No users', () => {
  const server = setupServer(
    rest.get('https://immense-bastion-95145.herokuapp.com/api/users', (req, res, ctx) => {
      return res(ctx.json({
        users: []
      }))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('handles no users', async () => {
    render(<Root store={store}/>)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    const noUsers = await screen.findByText(/No users/)
    expect(noUsers).toBeInTheDocument()
  })
})
