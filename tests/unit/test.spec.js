import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import LayoutOption from '@/components/layout/LayoutOption'
import LocalStorageMock from './LocalStorageMock'
global.localStorage = new LocalStorageMock

describe('LayoutOption', () => {
  it('tests to see if SectionPlan returns Add Phones', () => {
    const wrapper = mount(LayoutOption, {
      // propsData: { msg }
    })
    wrapper.vm.mainObject.mixAndMatchPlansArray[0].numberOfPhones = 1
    wrapper.vm.mainObject.mixAndMatchPlansArray[1].numberOfPhones = 2
    wrapper.vm.mainObject.mixAndMatchPlansArray[3].numberOfPhones = 1
    wrapper.vm.mainObject.mixAndMatchPlansArray[4].numberOfPhones = 1
    wrapper.vm.mainObject.autopay = true
    wrapper.vm.mainObject.militaryNew = true
    wrapper.vm.mainObject.lineAccess[0].value = 1
    // expect(wrapper.text()).to.include(msg)
   expect(wrapper.vm.total).to.equal('173.50') 
  })
})

