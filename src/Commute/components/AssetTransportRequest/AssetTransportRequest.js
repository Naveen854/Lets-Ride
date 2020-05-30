import React from 'react';
import {observer} from 'mobx-react';

import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/InputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';
import {FlexibleDateTime} from '../../../Common/components/FlexibleDateTime.js';
import {Button} from '../../../Common/components/Button.js';
import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';
import {DisplayListOfElements} from '../../../Common/components/DisplayListOfElements.js';

import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from '../RideRequest/styledComponents.js';
import strings from '../../i18n/strings.json';
@observer
class AssetTransportRequest extends React.Component{
    render(){
       const {from,to,details,
            isCheckedFlexibleTimings,
            onClickFlexibleTimings,
            onSubmitRequest,
            onChangeRequestFrom,
            onChangeRequestTo,
            displayError,
            onChangeTime,
            onChangeFromTime,
            onChangeToTime,
            onChangeNoOfAssets,
            onChangeAssetType,
            onChangeAssetSensitivity,
            onChangeWhomToDeliver,
            assetSensitivity={assetSensitivity},
            assetType={assetType}
        }=this.props;
        
        
        return (
            
            <FormDashboard>
                <Form>
                    <FormHeadingText>{strings.text.assetTranportRequest}</FormHeadingText>
                    <InputField placeholderText={strings.placeholderText.ex} 
                                type={strings.type.text} 
                                label={strings.label.from} 
                                onChange={onChangeRequestFrom} 
                                value={from}
                                displayError={displayError}/>
                    <InputField placeholderText={strings.placeholderText.ex} 
                                type={strings.type.text} 
                                label={strings.label.to} 
                                onChange={onChangeRequestTo} 
                                value={to}
                                displayError={displayError}/>
                    
                    {isCheckedFlexibleTimings?<FlexibleDateTime
                                onChangeFromTime={onChangeFromTime} 
                                onChangeToTime={onChangeToTime} />:
                        <DateAndTime label={strings.label.dateAndTime} onChangeTime={onChangeTime}/>}
                    <FlexibleTimings>
                      <CheckBox  type={strings.type.checkbox} 
                      onClick={onClickFlexibleTimings} />
                      <FlexibleTimingsLabel>{strings.label.flexibleTimings}</FlexibleTimingsLabel>
                    </FlexibleTimings>
                    <DisplayListOfElements listData={{title:strings.text.noOfAssets}} onChange={onChangeNoOfAssets} />
                    <DisplayDropDown data={assetType} onChange={onChangeAssetType}/>
                    <DisplayDropDown data={assetSensitivity} onChange={onChangeAssetSensitivity}/>
                    <InputField placeholderText={strings.placeholderText.nameMobileNumber} 
                                type={strings.type.text} 
                                label={strings.label.whomToDeliver} 
                                onChange={onChangeWhomToDeliver}
                                displayError={displayError}
                                value={details}/>
                    <Button buttonText={strings.text.request} onClickFunction={onSubmitRequest}/>
                </Form>
            </FormDashboard>
            );
    }
}
export {AssetTransportRequest};