import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

export const Pushable = styled(Sidebar.Pushable)`
  height: calc(100vh - 61px);
  @media (min-width: 768px) {
    .sidebar + .pusher {
      margin-left: 0;
      transition: margin-left 500ms ease, width 500ms ease;
      width: 100%;
    }

    .sidebar.visible + .pusher {
      margin-left: 260px;
      transition: margin-left 500ms ease, width 500ms ease;
      width: calc(100% - 260px);
    }
  }
`

export const Pusher = styled(Sidebar.Pusher)``
