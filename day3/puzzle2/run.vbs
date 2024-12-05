filename = "input.txt"

Set fso = CreateObject("Scripting.FileSystemObject")
Set f = fso.OpenTextFile(filename)
strFileText = f.ReadAll()

Dim outerRegex, innerRegex, outerMatch, outerMatches 

Set outerRegex = New RegExp  
outerRegex.Pattern = "(?:do\(\)|^)(.|\r|\n)*?don't\(\)"  
outerRegex.IgnoreCase = True 
outerRegex.Global = True

Set innerRegex = New RegExp  
innerRegex.Pattern = "mul\([0-9]+,[0-9]+\)"  
innerRegex.IgnoreCase = True 
innerRegex.Global = True  


Set outerMatches = outerRegex.Execute(strFileText)

Dim sum
For Each outerMatch in outerMatches
  Dim innerMatches
  Set innerMatches = innerRegex.Execute(outerMatch)

  For Each innerMatch in innerMatches
    operands = Split(Replace(Replace(innerMatch, "mul(", ""), ")", ""), ",")
    sum = sum + CInt(operands(0)) * CInt(operands(1))	
  Next 
Next 

MsgBox(sum)

f.Close