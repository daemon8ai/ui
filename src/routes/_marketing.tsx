import { createFileRoute, Outlet } from '@tanstack/react-router'
import { StickyHeader } from '#/components/StickyHeader'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <>
      <StickyHeader />
      <Outlet />
    </>
  )
}
