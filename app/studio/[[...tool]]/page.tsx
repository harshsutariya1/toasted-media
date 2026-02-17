import StudioWrapper from './StudioWrapper'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamicParams = true

export default function StudioPage() {
    return <StudioWrapper />
}
