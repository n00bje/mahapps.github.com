---
layout: no-sidebar
title: TextBox
---

## Introduction

Table of Contents

1. [Watermark](#watermark)
2. [Clear button](#clearbutton)
3. [Custom button](#custombutton)
4. [Attached properties](#attachedproperties)
5. [Why Attached Properties?](#why)

There is both a default style for `TextBox` and `RichTextBox` in this library, with additional styles for a search box and a textbox containing a button. We also provide attached properties in the `TextBoxHelper` class for creating 'watermarked' textboxes, adding a 'clear' button, selecting all text on focus etc. 

## Watermark {#watermark}

A **watermark** - in the context of textboxes - refers to text that appears in the textbox *before* the user has focused or entered any text. This is often an alternative to providing a label next to your textbox - for example, a search box would have a watermark with the text 'enter search terms' to indicate it's purpose.

    <TextBox Controls:TextBoxHelper.Watermark="This is a textbox" />

Will produce a textbox that looks like the below image. The three states are *unfocused* (with no user text provided), focused, and unfocused (with user text provided).

![]({{site.baseurl}}/images/10_textboxstates.png)

### UseFloatingWatermark

When set to true, the watermark will stay visible when the textbox contains text.

    <TextBox Controls:TextBoxHelper.Watermark="Name" 
             Controls:TextBoxHelper.UseFloatingWatermark="True" />

![]({{site.baseurl}}/images/textbox_floating_watermark.png)

### WatermarkAlignment

Change the position of the watermark by specifying a [TextAlignment](https://docs.microsoft.com/en-us/dotnet/api/system.windows.textalignment) value.

    <TextBox Controls:TextBoxHelper.Watermark="Name" 
             Controls:TextBoxHelper.WatermarkAlignment="Right" />

![]({{site.baseurl}}/images/textbox_watermark_alignment.png)

### WatermarkTrimming

Describes how the watermark is trimmed when it overflows the edge of the textbox.
Accepts a [TextTrimming](https://msdn.microsoft.com/en-us/library/system.windows.texttrimming.aspx) value.

### WatermarkWrapping

Specifies whether the watermark wraps when it reaches the edge of the textbox.
Accepts a [TextWrapping](https://msdn.microsoft.com/en-us/library/system.windows.textwrapping.aspx) value.

### AutoWatermark

When set to true, retrieves the watermark of the bound `Text` property when it has a [DisplayAttribute](https://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.displayattribute.aspx) with the `Prompt` property set.

View:

    <TextBox Text="{Binding LastName}" 
             Controls:TextBoxHelper.AutoWatermark="True" />

ViewModel:

    [Display(Prompt = "Surname")]
    public string LastName { get; set; }

Result:

![]({{site.baseurl}}/images/textbox_autowatermark.png)

*note: AutoWatermark is supported by `TextBox`, `ComboBox`, `NumericUpDown`, `HotKeyBox`, `DatePicker`, `TimePicker`, `DateTimePicker` and its derived classes.*

## Clear button {#clearbutton}

Like the watermark, a simple attached property adds a button to the textbox that, when clicked, clears the content of the textbox.

`<TextBox Controls:TextBoxHelper.ClearTextButton="True" />`

![]({{site.baseurl}}/images/11_textboxclearstates.png)

## Custom button {#custombutton}

You can easily add a button to a textbox by using the `MetroButtonTextBox` Style and customize it with the following attached properties found in the `TextBoxHelper` class:

### ButtonCommand

Allows you to bind the button's command property to a ICommand.

### ButtonCommandParameter

Allows you to pass a parameter with the button's command property.

### ButtonWidth

Changes the width of the button.

### ButtonsAlignment

Changes the position of the button in the containing textbox. Possible values are `Left` and `Right`.

### ButtonFontFamily

Changes the font of the button.
*Note: the default font is [Marlett](https://docs.microsoft.com/en-us/typography/font-list/marlett), a font used to draw scalable icons.*

### ButtonContentTemplate

Allows you to change the content of the button with a [DataTemplate](https://docs.microsoft.com/en-us/dotnet/api/system.windows.datatemplate)

### ButtonTemplate

Allows you to completely change the look of the button by defining your own [ControlTemplate](https://docs.microsoft.com/en-us/dotnet/framework/wpf/controls/customizing-the-appearance-of-an-existing-control).

## Attached Properties {#attachedproperties}

The following attached properties in the `TextBoxHelper` class might prove you useful:

### SelectAllOnFocus

When set to true, the textbox will select all its text when it gains focus.

    <TextBox Controls:TextBoxHelper.SelectAllOnFocus="True" />


## Why Attached Properties? {#why}

Rather than deriving from TextBox and adding another class to this library, these behaviours are implemented as Attached Properties.

This avoids the overhead of providing styles for another control, and makes it easy to "opt in" to this behaviour in your application.