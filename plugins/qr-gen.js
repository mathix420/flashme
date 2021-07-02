import QrCreator from 'qr-creator'

export default function (ctx, inject) {
  inject('QrGen', QrCreator)
}
