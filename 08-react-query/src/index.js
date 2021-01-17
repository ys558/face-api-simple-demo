import React from 'react'
import ReactDOM from 'react-dom'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { QueryClientProvider, QueryClient } from "react-query"
import preset from "@rebass/preset"

const queryClient = new QueryClient()

ReactDOM.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={preset}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </>,
  document.getElementById('root')
)