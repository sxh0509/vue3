import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import CpConsultMore from '@/components/CpConsultMore.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcons: typeof cpIcons
    cpRadioBtn: typeof cpRadioBtn
    CpConsultMore: typeof CpConsultMore
    CpPaySheet: typeof CpPaySheet
  }
}
