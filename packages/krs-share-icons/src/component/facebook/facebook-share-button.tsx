import createShareButton from '@module/hocs/create-share-button'
import { assert, objectToGetParams } from '@module/utils'

const facebookLink = (url: string, { hashtag }: { hashtag?: string }) => {
  assert(url, 'facebook.url')

  return (
    'https://www.facebook.com/sharer/sharer.php' +
    objectToGetParams({ u: url, hashtag })
  )
}

const FacebookShareButton = createShareButton<{ hashtag?: string }>(
  'facebook',
  facebookLink,
  (props) => ({ hashtag: props.hashtag }),
  {
    windowWidth: 550,
    windowHeight: 400
  }
)

export default FacebookShareButton
