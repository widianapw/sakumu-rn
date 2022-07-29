import { SelectedMap } from "../../tmd/components/picker/MapPicker";

type AppNavigationType = {
  MapPickerScreen: {
    onSelected: (selected: SelectedMap) => void;
    initial?: SelectedMap
  },
  LoginScreen: undefined,
  MainScreen: undefined,
  ImagePickerScreen: undefined,
  ButtonScreen: undefined,
  TypographyScreen: undefined,
  TextFieldScreen: undefined,
  PickerScreen: undefined,
  BottomSheetScreen: undefined,
  ModalScreen: undefined,
  TagScreen: undefined,
  AlertScreen: undefined,
  SelectorScreen: undefined,
  LanguageScreen: undefined,
  APIScreen: undefined,
  FetchDataScreen: undefined,
  PaginationScreen: undefined,
  ChipScreen: undefined,
  OTPScreen: undefined,
  FormScreen: undefined,
  LayoutScreen: undefined,
  TabScreen: undefined,
  AvatarScreen: undefined,
  BadgeScreen: undefined,
  TooltipScreen: undefined,
  TooltipStepperScreen: undefined,
  SkeletonScreen: undefined,
  DividerScreen: undefined,
};
export default AppNavigationType;
