<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333333;
            background-color: #F5F0EA;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #2D6A5A;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }
        .header p {
            color: #E0F2FE;
            margin: 6px 0 0;
            font-size: 14px;
        }
        .body {
            padding: 30px;
        }
        .body p {
            line-height: 1.6;
        }
        .info-block {
            background-color: #F5F0EA;
            border-radius: 6px;
            padding: 16px 20px;
            margin: 20px 0;
        }
        .info-block table {
            width: 100%;
        }
        .info-block td {
            padding: 4px 0;
        }
        .info-block td:first-child {
            font-weight: bold;
            width: 45%;
            color: #2D6A5A;
        }
        .total {
            font-size: 16px;
            font-weight: bold;
            color: #2D6A5A;
            margin-top: 20px;
        }
        .footer {
            background-color: #F5F0EA;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">

        <div class="header">
            <h1>Cowork'In</h1>
            <p>Confirmation de réservation</p>
        </div>

        <div class="body">
            <p>Bonjour <strong>{{ $reservation->user->name }}</strong>,</p>
            <p>Votre réservation a été confirmée. Vous trouverez ci-dessous le récapitulatif ainsi que votre facture en pièce jointe.</p>

            <div class="info-block">
                <table>
                    <tr>
                        <td>Espace :</td>
                        <td>{{ $reservation->space->name }}</td>
                    </tr>
                    <tr>
                        <td>Date début :</td>
                        <td>{{ \Carbon\Carbon::parse($reservation->start_time)->format('d/m/Y H:i') }}</td>
                    </tr>
                    <tr>
                        <td>Date fin :</td>
                        <td>{{ \Carbon\Carbon::parse($reservation->end_time)->format('d/m/Y H:i') }}</td>
                    </tr>
                    <tr>
                        <td>Type :</td>
                        <td>{{ ucfirst($reservation->type) }}</td>
                    </tr>
                </table>
            </div>

            <p class="total">Total TTC : {{ number_format($reservation->total_price, 2) }} €</p>

            <p>Votre facture est disponible en pièce jointe de cet email.</p>
            <p>À bientôt dans nos espaces,<br><strong>L'équipe Cowork'In</strong></p>
        </div>

        <div class="footer">
            Cowork'In — Cet email a été envoyé automatiquement, merci de ne pas y répondre.
        </div>

    </div>
</body>
</html>