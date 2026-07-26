import React, { Suspense } from 'react'
import type { FC } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

const LazyPageError = React.lazy(() => import('./PageError'))
const LazyPageNormal = React.lazy(() => import('./PageNormal'))

const ErrorBoundaryExample: FC = (props) => {
  return <div className="flex flex-col gap-[40px]">
    <h1>ErrorBoundaryExample</h1>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyPageError />
      </Suspense>
    </ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyPageNormal />
    </Suspense>
  </div>
}

export default ErrorBoundaryExample