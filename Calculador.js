import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class Calculadora extends Application {
    private TextField display;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Calculadora");

        display = new TextField();
        display.setEditable(false);
        display.setStyle("-fx-font-size: 20px;");
        display.setPrefHeight(50);

        GridPane grid = new GridPane();
        grid.setHgap(10);
        grid.setVgap(10);

        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"
        };

        int row = 1, col = 0;
        for (String text : buttons) {
            Button button = new Button(text);
            button.setPrefSize(60, 60);
            button.setStyle("-fx-font-size: 18px;");
            button.setOnAction(e -> handleInput(text));
            grid.add(button, col, row);
            col++;
            if (col == 4) {
                col = 0;
                row++;
            }
        }

        Button clearButton = new Button("C");
        clearButton.setPrefSize(60, 60);
        clearButton.setStyle("-fx-font-size: 18px; -fx-background-color: #dc3545; -fx-text-fill: white;");
        clearButton.setOnAction(e -> display.clear());
        grid.add(clearButton, 0, 5);

        grid.add(display, 0, 0, 4, 1);

        Scene scene = new Scene(grid, 300, 400);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void handleInput(String input) {
        if (input.equals("=")) {
            try {
                double result = eval(display.getText());
                display.setText(String.valueOf(result));
            } catch (Exception e) {
                display.setText("Erro");
            }
        } else {
            display.appendText(input);
        }
    }

    private double eval(String expression) {
        return new javax.script.ScriptEngineManager()
                .getEngineByName("JavaScript")
                .eval(expression)
                .doubleValue();
    }
}
