import 'dart:io';

bool is_safe(List<String> report_levels) {
  for (var i = 0; i <= report_levels.length; i++) {
    final filtered_report_levels = report_levels
        .asMap()
        .entries
        .where((e) => e.key != i - 1)
        .map((e) => int.parse(e.value))
        .toList();

    final report_variances = List.generate(filtered_report_levels.length - 1,
        (r) => filtered_report_levels[r] - filtered_report_levels[r + 1]);

    if (!report_variances.any((l) => l.abs() > 3 || l == 0) &&
        !(report_variances.any((l) => l < 0) &&
            report_variances.any((l) => l > 0))) {
      return true;
    }
  }

  return false;
}

void main() async {
  final file = File('input.txt');

  if (await file.exists()) {
    // Read the file line by line
    final lines = await file.readAsLines();

    final safe_reports = lines.where((line) => is_safe(line.split(" "))).length;

    print(safe_reports);
  } else {
    print('File not found: input.txt');
  }
}
