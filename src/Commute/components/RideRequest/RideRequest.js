import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'

import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides.js'
import { Form, FormDashboard } from '../../styledComponents/styleComponents.js'

import { withRouter } from 'react-router-dom'
import { withHeader } from '../../Hocs/withHeader'

import { InputField } from '../Common/components/InputField.js'
import { DateAndTime } from '../Common/components/DateTime.js'
import { Button } from '../Common/components/Button.js'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements.js'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime.js'

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from './styledComponents.js'

import strings from '../../i18n/strings.json'
@inject('commuteStore')
@observer
class RideRequest extends React.Component {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable seats
   @observable luggages
   constructor() {
      super()
      this.init()
   }
   @action.bound
   init() {
      this.isCheckedFlexibleTimings = false
      this.displayError = false
      this.from = ''
      this.to = ''
      this.dateTime = ''
      this.startDateTime = ''
      this.endDateTime = ''
      this.seats = 0
      this.luggages = 0
   }
   onClickFlexibleTimings = () => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeRequestFrom = event => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeRequestTo = event => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeTime = time => {
      this.dateTime = time
   }
   onChangeFromTime = time => {
      this.startDateTime = time
   }
   onChangeToTime = time => {
      this.endDateTime = time
   }
   onChangeNoOfSeats = seats => {
      this.seats = seats
   }
   onChangeNoOfLuggages = luggages => {
      this.luggages = luggages
   }
   onSubmitRequest = () => {
      this.displayError = true
      const {
         commuteStore: { postRideRequest }
      } = this.props
      let formDetails = [this.from, this.to, this.seats, this.luggages]
      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            alert('Submitted Succesfully')
            const rideRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               datetime: this.dateTime,
               no_of_seats: this.seats,
               luggage_quantity: this.luggages,
               start_datetime:null,
               end_datetime:null
               
            }
            postRideRequest(rideRequestData)

            this.init()
            this.displayError = false
         }
      } 
      else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            alert('Submitted Succesfully')
            const rideRequestData = {
               origin: this.from,
               destination: this.to,
               datetime:null,
               flexible_with_time: true,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,
               no_of_seats: this.seats,
               luggage_quantity: this.luggages
            }
            postRideRequest(rideRequestData)

            this.init()
            this.displayError = false
         }
      }
   }
   render() {
      const {
         from,
         to,
         seats,
         luggages,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfSeats,
         onChangeNoOfLuggages
      } = this
      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>{strings.text.rideRequest}</FormHeadingText>
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.from}
                  onChange={onChangeRequestFrom}
                  value={from}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.to}
                  onChange={onChangeRequestTo}
                  value={to}
                  displayError={displayError}
               />
               {isCheckedFlexibleTimings ? (
                  <FlexibleDateTime
                     onChangeFromTime={onChangeFromTime}
                     onChangeToTime={onChangeToTime}
                     displayError={displayError}
                  />
               ) : (
                  <DateAndTime
                     label={strings.label.dateAndTime}
                     onChangeTime={onChangeTime}
                     displayError={displayError}
                  />
               )}
               <FlexibleTimings>
                  <CheckBox
                     type={strings.type.checkbox}
                     onClick={onClickFlexibleTimings}
                  />
                  <FlexibleTimingsLabel>
                     {strings.label.flexibleTimings}
                  </FlexibleTimingsLabel>
               </FlexibleTimings>
               <DisplayListOfElements
                  listData={{ title: strings.text.noOfSeats }}
                  onChange={onChangeNoOfSeats}
                  displayError={displayError}
                  intial={seats}
               />
               <DisplayListOfElements
                  listData={{ title: strings.text.noOfLuggages }}
                  onChange={onChangeNoOfLuggages}
                  displayError={displayError}
                  intial={luggages}
               />
               <Button
                  buttonText={strings.text.request}
                  onClickFunction={onSubmitRequest}
               />
            </Form>
         </FormDashboard>
      )
   }
}
export default withRouter(withHeader(RideRequest))


//2020-05-27 05:06: