filename = "input.txt"

Set fso = CreateObject("Scripting.FileSystemObject")
Set f = fso.OpenTextFile(filename)
strFileText = f.ReadAll()

Dim regEx, match, matches 
Set regEx = New RegExp  
regEx.Pattern = "mul\([0-9]+,[0-9]+\)"  
regEx.IgnoreCase = True 
regEx.Global = True  
Set matches = regEx.Execute(strFileText)

Dim sum
For Each match in matches
  operands = Split(Replace(Replace(Match, "mul(", ""), ")", ""), ",")
  sum = sum + CInt(operands(0)) * CInt(operands(1))	 
Next 

MsgBox(sum)

f.Close