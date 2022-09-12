import mitt from 'mitt'

const emitter = mitt()

const $bus: any = {}

$bus.$on = emitter.on
$bus.$off = emitter.off
$bus.$emit = emitter.emit

export default $bus