import styled from "styled-components";

import React from 'react';
import { CirclePicker } from 'react-color'
import { observer } from "mobx-react-lite";
import { useAccountStore } from "../../../../store/Account";
import { useHistory } from "react-router";
import { routes } from "../../../../config/routes";
import SettingsHeader from "../SettingsHeader";
import BlockMessagesExample from "./BlockChatExample";
import DefaultMessagesExample from "./DefaultChatExample";
import { MessageStructure } from "src/types";
import { useAccountApi } from "src/api/AccountApi";
import { useSettingsApi } from "src/api/SettingsApi";
import { SettingsOptionsList, useSettingsStore } from "src/store/SettingsStore";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 0px;
  box-sizing: border-box;
  overflow-y: scroll;
  & > * {
    margin-top: 20px;
    &:first-child {
        margin-top: 0;
    }
  }
`;

const SettingContainer = styled.div`
  width: 70%;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.static.colors.dark};

  @media screen and (max-width: 800px) {
    width: 85%;
    }
`;

const ColorSetting = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* height: 120%; */
`;


// interface StyledInputProps {
//     minV: number;
//     maxV: number;
//     defaultV: number;
// }
const StyledInput = styled.input`
    width: 80%;
    background: ${
        props => countInputRangeBg(
            props.min as number,
            props.max as number,
            props.defaultValue as number,
            props.theme.personal.color
        )
    };
    border-radius: 8px;
    height: 8px;
    outline: none;
    -webkit-appearance: none;

    &[type=range] {
        position: relative;
    }
    &[type=range]:focus {
        outline: none;
    }
    &[type="range"]::-webkit-slider-runnable-track {
    }
    &[type="range"]::-webkit-slider-thumb {
    }
    &[type="range"]:disabled {
        background: #fff
    }
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + & {
        background-color: ${props => props.theme.personal.color};
    }
    input:focus + & {
        box-shadow: 0 0 1px ${props => props.theme.personal.color};
    }
    input:checked + &:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }
`;

const Rect = styled.div`
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 10%;
    &.rounded {
        border-radius: 90%;
    }
`;

const StyledPicker = styled(CirclePicker)`
    margin-left: 10%;

    @media screen and (max-width: 800px) {
        margin-left: 0;
    }
`;

const colors: string[] = [
    "#FF921C",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#a7b430",
    "#bdae2d",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b"
]

const SliderInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const countThumbPos = (min: number, max: number, value: number) => (
    (value - min)/(max - min)*100
)

const countInputRangeBg = (min: number, max: number, value: number, bg: string) => (
    'linear-gradient(to right, ' + bg + ' 0%, ' + bg + ' ' +
    countThumbPos(min, max, value) +
    '%, #fff ' +
    countThumbPos(min, max, value) +
    '%, white 100%)'
)

export const ThemeSettings: React.FC = observer(() => {
    const accountStore = useAccountStore();
    const settingsApi = useSettingsApi();
    const settingsStore = useSettingsStore();
    const user = accountStore.user;
    const history = useHistory();

    if(!user) {
        history.replace(routes.home);
        return null;
    }

    return (
        <>
        <SettingsHeader
            selectedSetting={settingsStore.selectedSetting}
            updateSelectedSetting={(newSetting) => settingsStore.selectedSetting = newSetting}
        />
            <Container>
                <SettingContainer>
                    <ColorSetting>
                        {
                            user.theme.structure === MessageStructure.block?
                            <BlockMessagesExample />:
                            <DefaultMessagesExample />
                        }
                        <StyledPicker
                            width="80%"
                            colors={colors}
                            onChange={async (color) => {
                                user.theme.color = color.hex
                                await settingsApi.updateTheme(user.theme);
                                accountStore.updateTheme(user.theme)
                            }}
                        />
                    </ColorSetting>
                </SettingContainer>
                <SettingContainer style={{justifyContent: 'space-around'}}>
                    <span style={{fontSize: '16px'}}>A</span>
                    <StyledInput
                        onChange={async (e) => {
                            user.theme.fontScale = Number(e.target!.value!)
                            await settingsApi.updateTheme(user.theme);
                            accountStore.updateTheme(user.theme)
                        }}
                        type="range"
                        min={0.6}
                        max={1.8}
                        step={0.1}
                        defaultValue={user.theme.fontScale}
                    />
                    <span style={{fontSize: '28px'}}>A</span>
                </SettingContainer>
                <SettingContainer style={{justifyContent: 'space-between'}}>
                    <span>Сообщение блоками</span>
                    <Switch>
                        <SliderInput
                            type="checkBox"
                            defaultChecked={user.theme.structure === MessageStructure.block}
                            onChange={async () => {
                                user.theme.structure = (
                                    user.theme.structure === MessageStructure.block?
                                    MessageStructure.default:
                                    MessageStructure.block
                                )
                                await settingsApi.updateTheme(user.theme);
                                accountStore.updateTheme(user.theme)
                            }}
                        />
                        <Slider />
                    </Switch>
                </SettingContainer>
                <SettingContainer style={{justifyContent: 'space-around'}}>
                    <Rect />
                    <StyledInput
                        disabled={user.theme.structure !== MessageStructure.block}
                        onChange={async (event) => {
                            user.theme.borderRadius = Number(event.target!.value!)
                            await settingsApi.updateTheme(user.theme);
                            accountStore.updateTheme(user.theme)
                        }}
                        type="range"
                        min={2}
                        max={18}
                        step={1}
                        defaultValue={user.theme.borderRadius}
                    />
                    <Rect className="rounded" />
                </SettingContainer>
            </Container>
        </>
    );
});

export default ThemeSettings;