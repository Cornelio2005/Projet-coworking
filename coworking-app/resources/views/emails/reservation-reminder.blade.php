<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rappel de réservation</title>
</head>
<body style="margin:0; padding:0; background-color:#F5F0EA; font-family: Roboto, Arial, sans-serif;">

    <div style="max-width:560px; margin:40px auto; background:#FFFFFF; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        {{-- HEADER --}}
        <div style="background-color:#2D6A5A; padding:32px 40px;">
            <h1 style="margin:0; font-family:Montserrat,Arial,sans-serif; font-size:22px; font-weight:800; color:#FFFFFF;">
                Cowork'In
            </h1>
            <p style="margin:8px 0 0; font-size:13px; color:rgba(255,255,255,0.75);">
                Votre espace de coworking
            </p>
        </div>

        {{-- CORPS --}}
        <div style="padding:40px;">

            <p style="margin:0 0 8px; font-size:15px; color:#1a1a1a;">
                Bonjour <strong>{{ $reservation->user->name }}</strong>,
            </p>

            <p style="margin:0 0 28px; font-size:14px; color:#555; line-height:1.6;">
                Votre réservation commence dans <strong>moins d'une heure</strong>. Voici le récapitulatif :
            </p>

            {{-- BLOC RÉCAP --}}
            <div style="background-color:#F5F0EA; border-radius:12px; padding:24px; margin-bottom:28px;">
                <table style="width:100%; border-collapse:collapse;">
                    <tr>
                        <td style="font-size:13px; color:#888; padding:6px 0;">Espace</td>
                        <td style="font-size:13px; color:#1a1a1a; font-weight:600; text-align:right;">
                            {{ $reservation->space->name }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:13px; color:#888; padding:6px 0;">Date</td>
                        <td style="font-size:13px; color:#1a1a1a; font-weight:600; text-align:right;">
                            {{ \Carbon\Carbon::parse($reservation->start_time)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:13px; color:#888; padding:6px 0;">Horaire</td>
                        <td style="font-size:13px; color:#1a1a1a; font-weight:600; text-align:right;">
                            {{ \Carbon\Carbon::parse($reservation->start_time)->format('H\hi') }}
                            →
                            {{ \Carbon\Carbon::parse($reservation->end_time)->format('H\hi') }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:13px; color:#888; padding:6px 0;">Montant</td>
                        <td style="font-size:13px; color:#2D6A5A; font-weight:800; text-align:right;">
                            {{ number_format($reservation->total_price, 2, ',', ' ') }} €
                        </td>
                    </tr>
                </table>
            </div>

            <p style="margin:0; font-size:13px; color:#888; line-height:1.6;">
                Pensez à vous munir de votre QR code d'accès disponible depuis votre espace personnel.
            </p>

        </div>

        {{-- FOOTER --}}
        <div style="background-color:#F5F0EA; padding:24px 40px; text-align:center;">
            <p style="margin:0; font-size:12px; color:#aaa;">
                © {{ date('Y') }} Cowork'In · Cet email a été envoyé automatiquement, merci de ne pas y répondre.
            </p>
        </div>

    </div>

</body>
</html>