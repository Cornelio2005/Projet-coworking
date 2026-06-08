<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #333333;
            margin: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 28px;
            color: #2D6A5A;
            margin: 0;
        }
        .header p {
            color: #888;
            margin: 4px 0;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #2D6A5A;
            border-bottom: 2px solid #2D6A5A;
            padding-bottom: 4px;
            margin-top: 30px;
            margin-bottom: 12px;
        }
        .info-table {
            width: 100%;
        }
        .info-table td {
            padding: 4px 0;
        }
        .info-table td:first-child {
            font-weight: bold;
            width: 40%;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
        }
        .items-table th {
            background-color: #2D6A5A;
            color: #ffffff;
            padding: 8px;
            text-align: left;
        }
        .items-table td {
            padding: 8px;
            border-bottom: 1px solid #dddddd;
        }
        .items-table tr:nth-child(even) td {
            background-color: #f9f9f9;
        }
        .totals {
            margin-top: 20px;
            text-align: right;
        }
        .totals table {
            display: inline-table;
            width: 280px;
            border-collapse: collapse;
        }
        .totals td {
            padding: 6px 8px;
            border-bottom: 1px solid #eeeeee;
        }
        .totals td:first-child {
            font-weight: bold;
            color: #555;
        }
        .totals .total-ttc td {
            font-size: 15px;
            font-weight: bold;
            color: #2D6A5A;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Cowork'In</h1>
        <p>Facture de réservation</p>
        <p>N° {{ $reservation->id }} — {{ \Carbon\Carbon::parse($reservation->created_at)->format('d/m/Y') }}</p>
    </div>

    <div class="section-title">Informations client</div>
    <table class="info-table">
        <tr>
            <td>Nom :</td>
            <td>{{ $reservation->user->name }}</td>
        </tr>
        <tr>
            <td>Email :</td>
            <td>{{ $reservation->user->email }}</td>
        </tr>
    </table>

    <div class="section-title">Détail de la réservation</div>
    <table class="info-table">
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

    <div class="section-title">Facturation</div>
    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Montant HT</th>
                <th>TVA (20%)</th>
                <th>Montant TTC</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $reservation->space->name }}</td>
                <td>{{ number_format($reservation->total_price / 1.2, 2) }} €</td>
                <td>{{ number_format($reservation->total_price - ($reservation->total_price / 1.2), 2) }} €</td>
                <td>{{ number_format($reservation->total_price, 2) }} €</td>
            </tr>
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr>
                <td>Total HT :</td>
                <td>{{ number_format($reservation->total_price / 1.2, 2) }} €</td>
            </tr>
            <tr>
                <td>TVA (20%) :</td>
                <td>{{ number_format($reservation->total_price - ($reservation->total_price / 1.2), 2) }} €</td>
            </tr>
            <tr class="total-ttc">
                <td>Total TTC :</td>
                <td>{{ number_format($reservation->total_price, 2) }} €</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Cowork'In — Merci de votre confiance. Ce document tient lieu de facture.
    </div>

</body>
</html>