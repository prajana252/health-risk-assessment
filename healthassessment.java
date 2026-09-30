import java.util.Scanner;

public class HealthRiskAssessment {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("===== HEALTH RISK ASSESSMENT =====");

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.print("Enter your BMI: ");
        double bmi = sc.nextDouble();

        System.out.print("Enter your systolic blood pressure: ");
        int bp = sc.nextInt();

        System.out.print("Enter your blood glucose level: ");
        int glucose = sc.nextInt();

        System.out.print("Do you smoke? (yes/no): ");
        String smoking = sc.next();

        int score = 0;

        if (age >= 60)
            score += 2;
        else if (age >= 40)
            score += 1;

        if (bmi >= 30)
            score += 2;
        else if (bmi >= 25)
            score += 1;

        if (bp >= 140)
            score += 2;
        else if (bp >= 130)
            score += 1;

        if (glucose >= 126)
            score += 2;
        else if (glucose >= 100)
            score += 1;

        if (smoking.equalsIgnoreCase("yes"))
            score += 2;

        System.out.println("\n===== RESULT =====");

        if (score <= 2) {
            System.out.println("Risk Level: LOW");
        }
        else if (score <= 5) {
            System.out.println("Risk Level: MODERATE");
        }
        else {
            System.out.println("Risk Level: HIGH");
        }

        System.out.println("Risk Score: " + score);

        System.out.println("\nNote: This is an educational assessment and");
        System.out.println("does not replace professional medical advice.");

        sc.close();
    }
}
