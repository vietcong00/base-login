import { Vue } from 'vue-class-component';
import { translateYupError } from '@/common/helpers';

export class UtilMixins extends Vue {
    translateYupError = translateYupError;
}
