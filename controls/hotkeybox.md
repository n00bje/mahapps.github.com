---
layout: no-sidebar
title: HotKeyBox
---

A textbox that accepts keyboard shortcuts as input with the following features:
 - Handles all hotkeys except `Tab`, `Shift+Tab` (used for navigation) and `Back` (clears the hotkey).
 - Optionally modifier keys (`Ctrl`, `Alt`, `Shift`, or `Win`) are required.
 - Uses Win API [`GetKeyNameText`](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646300) to get a textual representation of the keys. No localization is required, as it only depends on the keyboard layout as configured in Windows.

*Note: **The only purpose of  `HotKeyBox`  is to enable the user to  _enter_  a hotkey. Registering and handling hotkeys is out of its scope.** The following example uses [**NHotkey**](https://github.com/thomaslevesque/NHotkey) ([NuGet](https://www.nuget.org/packages/NHotkey.Wpf/)) for the handling.*

View:

    <Controls:HotKeyBox Controls:TextBoxHelper.Watermark="Enter hot key" 
                        AreModifierKeysRequired="{Binding ElementName=ModifierKeysRequired, Path=IsChecked}" 
                        HotKey="{Binding HotKey, ValidatesOnDataErrors=True, UpdateSourceTrigger=PropertyChanged, NotifyOnValidationError=True}" />

ViewModel:

        private HotKey _hotKey = new HotKey(Key.E, ModifierKeys.Alt | ModifierKeys.Control);
        public HotKey HotKey
        {
            get => _hotKey;
            set
            {
                if (_hotKey != value)
                {
                    _hotKey = value;

                    if (_hotKey != null && _hotKey.Key != Key.None)
                    {
                        HotkeyManager.Current.AddOrReplace("demo", _hotKey.Key, _hotKey.ModifierKeys, (sender, e) => OnHotKey(sender, e));
                    }
                    else
                    {
                        HotkeyManager.Current.Remove("demo");
                    }

                    RaisePropertyChanged(nameof(HotKey));
                }
            }
        }

        private async Task OnHotKey(object sender, HotkeyEventArgs e)
        {
            await ((MetroWindow)Application.Current.MainWindow).ShowMessageAsync(
                "Hotkey pressed",
                "You pressed the hotkey '" + HotKey + "' registered with the name '" + e.Name + "'");
        }

Result:

![]({{site.baseurl}}/images/hotkeybox.png)
