import 'dart:io';

void main() async {
  final file = File('input.txt');

  if (await file.exists()) {
    // Read the file line by line
    final lines = await file.readAsLines();

    final report_variances = new List<List<int>>.empty(growable: true);
    for (var line in lines) {
      final report_line = line.split(" ");

      report_variances.add(List.generate(report_line.length - 1,
          (r) => int.parse(report_line[r]) - int.parse(report_line[r + 1])));
    }

    final safe_reports = report_variances
        //numbers with a variance of more than 3, or no movement at all
        .where((r) => !r.any((l) => l.abs() > 3 || l == 0))
        //numbers where an increase and decrease is observed
        .where((r) => !(r.any((l) => l < 0) && r.any((l) => l > 0)));

    print(safe_reports.length);
  } else {
    print('File not found: input.txt');
  }
}
